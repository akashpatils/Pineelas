const COUNTRY_CENTROIDS = {
    "Albania"                 : [  20.162263000000003 ,  41.1566225          ],
    "Argentina"               : [ -63.5218925         , -38.541155           ],
    "Australia"               : [ 133.454211          , -27.1513915          ],
    "Bangladesh"              : [  90.37857149999999  ,  23.558704499999997  ],
    "Belgium"                 : [   4.335115500000001 ,  50.50225399999999   ],
    "Brazil"                  : [ -54.358614          , -14.261945999999998  ],
    "Bulgaria"                : [  25.469303500000002 ,  42.7347045          ],
    "Canada"                  : [ -96.8229395         ,  62.4541725          ],
    "Chile"                   : [ -71.30215749999999  , -36.595921           ],
    "China"                   : [ 104.35084499999999  ,  35.8282525          ],
    "Croatia"                 : [  16.23966           ,  44.351143           ],
    "Cyprus"                  : [  33.130774          ,  34.872496999999996  ],
    "Denmark"                 : [  10.3899915         ,  56.265016           ],
    "Djibouti"                : [  42.489806          ,  11.813258999999999  ],
    "Egypt"                   : [  30.78315           ,  26.792839999999998  ],
    "Estonia"                 : [  25.735747          ,  58.542809           ],
    "France"                  : [   2.4838329999999997,  46.2642565          ],
    "Germany"                 : [  10.502827          ,  51.142796           ],
    "Greece"                  : [  23.377106          ,  38.3734465          ],
    "India"                   : [  82.789603          ,  21.729772500000003  ],
    "Indonesia"               : [ 118.767769          ,  -2.801999           ],
    "Iraq"                    : [  43.680156          ,  33.2421445          ],
    "Ireland"                 : [  -8.0050355         ,  53.4004615          ],
    "Italy"                   : [  12.615101          ,  41.867689999999996  ],
    "Japan"                   : [ 136.723831          ,  37.304984           ],
    "Jordan"                  : [  37.0590355         ,  31.288090500000003  ],
    "Kenya"                   : [  37.874325999999996 ,   0.41461499999999996],
    "Kingdom of Bahrain"      : [  50.54728182893369  ,  25.99188871316317   ],
    "Kuwait"                  : [  47.4924035         ,  29.2925665          ],
    "Latvia"                  : [  24.6162545         ,  56.792632           ],
    "Lithuania"               : [  23.822039500000002 ,  55.139115000000004  ],
    "Malaysia"                : [ 109.66326           ,   2.006467           ],
    "Mexico"                  : [-101.969871          ,  23.6298295          ],
    "Mozambique"              : [  35.477478          , -18.529643999999998  ],
    "Myanmar"                 : [  96.7416195         ,  19.1344525          ],
    "Netherlands"             : [   5.203512          ,  52.157061999999996  ],
    "New Zealand"             : [ 172.79858           , -40.493962           ],
    "Oman"                    : [  55.904035          ,  21.5234925          ],
    "Pakistan"                : [  69.3558495         ,  30.412498           ],
    "Philippines"             : [ 121.883548          ,  11.891755           ],
    "Poland"                  : [  19.0522535         ,  51.9394655          ],
    "Portugal"                : [  -7.957829500000001 ,  39.559369           ],
    "Qatar"                   : [  51.17530549999999  ,  25.3354565          ],
    "Romania"                 : [  24.9233675         ,  45.954663           ],
    "Saudi Arabia"            : [  45.1494975         ,  24.25445            ],
    "Slovenia"                : [  15.131459          ,  46.152351           ],
    "Somalia"                 : [  46.057460000000006 ,   5.170695           ],
    "South Africa"            : [  24.5875485         , -28.4552395          ],
    "South Sudan"             : [  29.5924935         ,   7.878589           ],
    "Spain"                   : [  -3.1767000000000003,  39.847594           ],
    "Sri Lanka"               : [  80.741563          ,   7.896224           ],
    "Sudan"                   : [  30.17345           ,  15.309865           ],
    "Sweden"                  : [  17.465374          ,  62.233992           ],
    "Thailand"                : [ 101.4824675         ,  13.054617           ],
    "Turkey"                  : [  35.418670500000005 ,  38.98151            ],
    "United Arab Emirates"    : [  54.008001          ,  24.121758           ],
    "United Kingdom"          : [  -2.9453185         ,  54.2975             ],
    "United States of America": [-119.37788549999999  ,  45.136977           ],
    "Uruguay"                 : [ -55.8183315         , -32.5311665          ],
    "Taiwan, Republic of China"  :[120.9605, 23.6978]
  }
  
  const empty = { type: "FeatureCollection", features: [] }
  
  export const getCountryCentroid = (country) => {
    return COUNTRY_CENTROIDS[country.replace(' ', ' ')]
  }
  
  const getFeature = (origin, destination) => {
    const centroidOrigin = getCountryCentroid(origin)
    const centroidDestination = getCountryCentroid(destination)
    if (!centroidOrigin || !centroidDestination) {
      console.error(`There is some problem with ${origin} or ${destination} centroid, please verify Country name.`)
      return
    }
    return {
      type: "Feature",
      geometry: {
        type: "LineString",
        coordinates: [centroidOrigin, centroidDestination]
      },
      properties: {
        origin, destination,
        color: "#000",
        opacity: 0.7,
        weight: 4
      }
    }
  }
  
  export const generateCountryLinesGeoJSON = (data, country, destination) => {
    const geojson = JSON.parse(JSON.stringify(empty))
  
    if (!country) {
      console.warn(`Empty Contry was passed, retuning Empty GeoJSON.`)
      return geojson
    }
  
    if (!getCountryCentroid(country)) {
      console.error(`Country "${country}" Not found in Centroid List.`)
      return geojson
    }
  
    if (country && destination) {
      const feature = getFeature(country, destination)
      geojson.features.push(feature)
      return geojson
    }
  
    const connections = new Set()
  
    data.forEach(entry => {
      const origin = entry.POL_COUNTRY
      const destination = entry.POD_COUNTRY
  
      if (origin === country || destination === country) {
        const pair = [origin, destination].sort()
        connections.add(JSON.stringify(pair))
      }
    })
  
    connections.forEach(pair => {
      const [country1, country2] = JSON.parse(pair)
  
      let origin, destination
      if (country1 === country) {
        origin = country1
        destination = country2
      } else {
        origin = country2
        destination = country1
      }
  
      const feature = getFeature(origin, destination)
      if (feature) geojson.features.push(feature)
    })
  
    return geojson
  }