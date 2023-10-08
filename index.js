import express from 'express';
import fetch from 'node-fetch';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post('/api/v1', async (req, res) => {
  try {
    // Get the JSON data from the request
    const request_data = req.body;

    // Define the headers for the Monito API request
    const headers = {
      authority: 'www.monito.com',
      accept: '*/*',
      'accept-language': 'en-US,en;q=0.9',
      'apollographql-client-name': 'monito-website',
      'apollographql-client-version': '1.0.0',
      'content-type': 'application/json',
      cookie:
        'twp_id=ljoe3f8230626aabbcdbchgz; twp_cookie=ljoe3f8230626aabbcdbchgz; twp_device=desktop; twp_lang=en; twp_ab_group=g; twp_gloc=ng; twp_market=eyJmaXJzdCI6eyJ0aW1lc3RhbXAiOjE2ODc3NzE0ODQxNDksInJlZmVycmVyIjoiaHR0cHM6Ly93d3cuZ29vZ2xlLmNvbS8iLCJsYW5kaW5nVXJsIjoiaHR0cHM6Ly93d3cubW9uaXRvLmNvbS8iLCJsYW5kaW5nUGFnZUNhdGVnb3J5IjoiSG9tZSIsImNoYW5uZWwiOiJPcmdhbmljIFNlYXJjaCJ9LCJsYXN0Ijp7InRpbWVzdGFtcCI6MTY5Njc2MjQ3ODgwOSwibGFuZGluZ1VybCI6Imh0dHBzOi8vd3d3Lm1vbml0by5jb20vIiwibGFuZGluZ1BhZ2VDYXRlZ29yeSI6IkhvbWUiLCJjaGFubmVsIjoiRGlyZWN0In19',
      dnt: '1',
      origin: 'https://www.monito.com',
      referer: 'https://www.monito.com/en/compare/transfer/gb/ae/gbp/aed/2000',
      'sec-ch-ua': '"Chromium";v="117", "Not;A=Brand";v="8"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': '"macOS"',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'same-origin',
      'user-agent':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36',
    };

    // Define the data for the Monito API request
    const data = {
      operationName: 'GQLTransferComparison',
      variables: request_data,
      query:
        'mutation GQLTransferComparison($lang: String!, $from: String!, $to: String!, $currencyFrom: String!, $currencyTo: String!, $amount: Float!, $maxAge: Int!) { results: compareTransfers( corridor: {from: $from, to: $to, currencyFrom: $currencyFrom, currencyTo: $currencyTo, amount: $amount} sync: true maxAge: $maxAge ) { comparisonId start midMarket { rate } corridor { amountUSD } providerQuotes { psp { slug name displayName(locale: $lang) type url(locale: $lang) affiliateUrl(locale: $lang) affiliate isQuoteRequestLink logo { sm } languages { code label } providerScore { value categories { type value } } payoutNetworks(countriesFilter: [$to]) { slug payouts name numberOfLocations } } quotes { payin payout transferTime { min max } receivedAmount rate fee { transfer externalPayin externalPayout payin payout total } promos { id headline details conditions endDate newCustomersOnly coupon receivedAmount transferCredit { amount currency } rate fee { transfer payin payout total } } exposures { device language index } valueProps { messageKeys } messages { type messageKeys } } } } }',
    };

    // Make the request to the Monito API
    const response = await fetch('https://www.monito.com/api/v1', {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(data),
    });

    // Get the JSON response from the Monito API and send it as the response
    const responseData = await response.json();
    res.json(responseData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
