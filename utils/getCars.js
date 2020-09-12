const axios = require('axios')
const cheerio = require('cheerio')

async function request(url) {
  const res = await axios.get(url)
  return res.data
}

async function getImages(data) {
  const $ = cheerio.load(data)
  let teamData = []
  let defaultTeam = { teamName: 'Multiplayer' }
  $('.col-12.col-md-6').each((i, el) => {
    let teamName = $(el).find($('.f1-color--black')).text()
    let teamLogo = $(el).find($('.logo picture img'))[0].attribs['data-src']
    let teamColor = $(el)
      .find($('.listing-link'))[0]
      .attribs['style'].split(':')[1]
    let teamCar = $(el).find($('.listing-image picture img.lazy'))[0].attribs[
      'data-src'
    ]
    teamData.push({
      teamName,
      teamLogo,
      teamColor,
      teamCar
    })
  })
  let teams = [...teamData, defaultTeam]
  return teams
}

async function main() {
  let results = await request('https://www.formula1.com/en/teams.html')
  const teams = await getImages(results)
  return teams
}

module.exports = main
