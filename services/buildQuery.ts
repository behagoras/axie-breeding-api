export default function buildQuery () {
  let query = 'query GetAxieBriefList($criteria: AxieSearchCriteria) { '
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < 30; i++) {
    query += `ax${i}: axies(auctionType: Sale, sort: PriceAsc, criteria: $criteria, from: ${i * 10000
      }, size: 10000) `
    query += '{ results { id genes auction { currentPrice } } }\n'
  }
  query += ' }'
  return query
}
