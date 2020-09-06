const axios = require('axios')
const cheerio = require('cheerio')
const slugify = require('slugify')
const { GrandPrix, SetupType, Setup } = require('./models')
async function main() {
  const page = await request()
  const [trackData] = scraper(page)
  await insertTracks(trackData)
  // await Promise.all(
  //   trackData.map(async (track) => {
  //     let tmp = await request(track.link)

  //     let types = selectSetupType(tmp)
  //     await insertSetupTypes(types)
  //     new Promise((resolve) => setTimeout(resolve, 3000))
  //     await Promise.all(
  //       types.map(async (t) => {
  //         let res = await request(t.link)
  //         let model = await GrandPrix.findOne({
  //           where: { name: t.grandPrix },
  //           raw: true
  //         })
  //         //   console.log(model.id)
  //         if (model) {
  //           let type = await SetupType.findOne({
  //             where: { gpId: model.id, setupType: t.type },
  //             raw: true
  //           })

  //           let setups = getSetups(res, model.id, type.id)
  //           await Setup.bulkCreate(setups, { ignoreDuplicates: true })
  //         }
  //         new Promise((resolve) => setTimeout(resolve, 3000))
  //       })
  //     )
  //   })
  // )

  return true
}
async function insertTracks(trackData) {
  let formattedTrackData = trackData.map((t) => ({
    name: t.grand_prix,
    forumLink: t.link
  }))
  return await GrandPrix.bulkCreate(formattedTrackData, {
    ignoreDuplicates: true
  })
}

function getSetups(page, currentTrack, type) {
  const $ = cheerio.load(page)
  let options = $('script').filter(
    (i, el) => el.attribs['type'] && el.attribs['type'].includes('json')
  )
  let setupData = []
  options.each((i, js) => {
    js.children.filter((el, index) => {
      let values = JSON.parse(el.data)
      let base = values.text

      if (base) {
        let baseSetup = parseSetupData(base, type)
        setupData.push({ data: baseSetup, gpId: currentTrack, typeId: type })
      }

      let comments = values.comment
      if (comments) {
        comments.forEach((c) => {
          if (c.text.toLowerCase().includes('team')) {
            setupData.push({
              data: parseSetupData(c.text),
              gpId: currentTrack,
              typeId: type
            })
          }
        })
      }
    })
  })
  return setupData.filter((data) => data.data.length)
}

function parseSetupData(data, typeId) {
  let parseBull = data.split('\n')
  let tIndex = parseBull
    .map((str, j) => {
      let rawStr = str.replace('\t', '').trim()
      return rawStr
    })
    .filter((str) => str)
    .map((str) => {
      let obj = {}
      if (str.includes(':')) {
        let values = str.replace(':', '*').split('*')
        let objKey = values[0]
        let value = values[1].trim()
        if (objKey.length <= 20) {
          obj[
            slugify(objKey, { replacement: '_', lower: true }).replace('-', '_')
          ] = {
            value,
            key: objKey
          }
          return obj
        }
      }
    })
    .filter((obj) => obj)
  return Object.values(tIndex)
}

async function insertSetupTypes(setupTypes) {
  const options = await buildSetupOptions(setupTypes)
  await SetupType.bulkCreate(options, { ignoreDuplicates: true })
}
async function request(url) {
  try {
    const res = await axios.get(
      url || 'https://www.f1carsetup.com/index.php?/forum/453-f1-2020-setups/'
    )
    return res.data
  } catch (error) {
    console.log(error.message, url)
  }
}
async function buildSetupOptions(options) {
  return Promise.all(
    options.map(async (opt) => {
      const model = await GrandPrix.findOne({
        where: { name: opt.grandPrix },
        attributes: ['id'],
        raw: true
      })
      if (model) {
        return { setupType: opt.type, gpId: model.id, url: opt.link }
      }
    })
  )
}
function selectSetupType(page) {
  const $ = cheerio.load(page)
  let options = $('#ipsLayout_mainArea').find(
    $('.ipsDataItem_title .ipsType_break a')
  )
  let setupOptions = []
  options.each((i, el) => {
    let strSplit = el.attribs['title'].trim().split(' ')
    let title = strSplit.splice(0, 3).join(' ')
    setupOptions.push({
      grandPrix: title,
      link: el.attribs['href'],
      type: strSplit[strSplit.length - 1]
    })
  })
  return setupOptions
}

function scraper(page) {
  const $ = cheerio.load(page)
  let table = {}
  let headers = $('.ipsForumGrid').find($('.cForumGrid__hero-image'))
  let links = $('.ipsForumGrid').find($('.cForumGrid__hero-link'))
  headers.each((i, el) => {
    let header = el.attribs['aria-label'].trim()
    if (!header.match('F2')) {
      table[header] = {
        grand_prix: header,
        link: links[i].attribs['href'],
        setups: []
      }
    }
  })
  let trackData = Object.values(table)
  return [trackData]
}

main()
