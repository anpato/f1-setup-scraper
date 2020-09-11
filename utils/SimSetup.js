const axios = require('axios')
const cheerio = require('cheerio')
const { GrandPrix, Setup, Team } = require('../db/models')
const { Op } = require('sequelize')
async function main() {
  const page = await request('https://simracingsetup.com/setups/f1-2020/')
  const { data, links } = LoadGp(page)
  await GrandPrix.bulkCreate(data, { ignoreDuplicates: true })
  let preparedSetupData = []
  for (let i = 0; i < links.length; i++) {
    const link = links[i]
    let location = data[i].name
    let linkData = await request(link)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    let setupLinks = PrepareSetupLinks(linkData)

    for (let j = 0; j < setupLinks.length; j++) {
      const setupLink = setupLinks[j]
      const setupData = await ParseSetupData(setupLink.link, request, location)
      preparedSetupData.push({
        location,
        team: setupLink.teamName,
        data: setupData,
        type: setupLink.type
      })
    }
  }
  await prepareSetups(preparedSetupData)
  return true
}

async function prepareSetups(data) {
  let sets = data
  sets.forEach((d, index) => {
    let r = d.data
    let keys = Object.keys(r)
    let values = Object.values(r)
    let results = {}
    keys.forEach((k, i) => {
      if (k === 'brake_bias') {
        k = 'front_brake_bias'
      }
      results[camelize(k.replace('_aero', ''), '_')] = values[i]
    })
    sets[index].data = results
  })

  const setups = await Promise.all(
    sets.map(async (d) => {
      let team = await Team.findOne({
        where: { teamName: { [Op.iLike]: `%${d.team.trim()}%` } },
        raw: true
      })
      let gp = await GrandPrix.findOne({
        where: { name: { [Op.iLike]: `%${d.location.trim()}%` } },
        raw: true
      })
      return { ...d.data, gpId: gp.id, teamId: team.id, conditions: d.type }
    })
  )
  await Setup.bulkCreate(setups, { ignoreDuplicates: true })
}

function capitalize(word) {
  return `${word.slice(0, 1).toUpperCase()}${word.slice(1).toLowerCase()}`
}
function camelize(text, seperator) {
  if (typeof seperator === undefined) return text
  const words = text.split(seperator)
  const result = [words[0]]
  words.slice(1).forEach((word) => result.push(capitalize(word)))
  return result.join('')
}

function LoadGp(page) {
  const $ = cheerio.load(page)
  let links = []
  let gpData = []
  $('a.car-setup-archive-box').each((i, el) => {
    let trackTitle = $(el).find('.track-title').text()
    let gpName = $(el).find('.track-subtitle').text().replace('2020', '')
    let gpFlag = $(el).find('.listing-info img')[0].attribs['data-lazy-src']
    links.push(el.attribs['href'])
    gpData.push({
      name: gpName.trim(),
      location: trackTitle,
      locationFlag: gpFlag
    })
  })
  return { data: gpData, links }
}

function PrepareSetupLinks(page) {
  let setupLinks = []
  const $ = cheerio.load(page)
  $('.row ul li a').each((i, el) => {
    let obj = {}
    let link = el.attribs['href']
    let str = link.replace('prix-2020-', '*').split('*')

    let teamName
    switch (true) {
      case link.includes('wet'):
        teamName = parseTeamNames(str[1].replace('-wet', '*').split('*')[0])
        obj = {
          teamName,
          type: 'wet',
          link
        }
        break
      default:
        teamName = parseTeamNames(str[1].replace('-dry', '*').split('*')[0])
        obj = {
          teamName,
          type: 'dry',
          link: link
        }
        break
    }
    setupLinks.push(obj)
  })
  return setupLinks
}
function parseTeamNames(str) {
  let name = str.split('-').join(' ')
  if (!name.includes(' ')) {
    return name.charAt(0).toUpperCase() + name.slice(1)
  }

  let newStr = ''
  str
    .split('-')
    .forEach((c) => (newStr += ` ${c.charAt(0).toUpperCase() + c.slice(1)}`))
  return newStr.trim()
}

async function ParseSetupData(link, cb) {
  let queries = {
    main: '.listing-detail-part',
    stat: '.listing-detail-stat',
    heading: '.listing-detail-heading'
  }
  const page = await cb(link)
  const $ = cheerio.load(page)
  let obj = {}
  let raceName = $('.listing-item h1').text()
  console.log(raceName)
  $(queries.main).each((i, el) => {
    let key = $(el).find(queries.heading).text().toLowerCase().trim()
    if (key !== 'rating') {
      let data = $(el).find(queries.stat).text().trim()
      let objKey = key.split(' ').join('_')
      obj[objKey] = data
    }
  })
  $('.setup-part-50').each((i, el) => {
    let column = $(el)
      .find(queries.heading)
      .text()
      .split(' ')
      .join('_')
      .toLowerCase()
      .replace(':', '')
      .replace('-', '_')
    let value = $(el).find(queries.stat).text()
    obj[column] = parseFloat(value)
  })
  return obj
}

async function request(url) {
  try {
    const res = await axios.get(url)
    return res.data
  } catch (error) {
    console.log(error.message, url)
  }
}

main()
