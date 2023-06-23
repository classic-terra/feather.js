import { LCDClient } from '../src';

async function main() {
  const bombay = new LCDClient({
    chainID: 'columbus-5',
    URL: 'https://lcd.terrarebels.net',
    gasPrices: { uusd: 0.38 },
  });

  console.log(`Proposer: ${JSON.stringify(await bombay.gov.proposer(5320))}`);
  console.log(
    `Initial Deposit:  ${JSON.stringify(await bombay.gov.initialDeposit(5320))}`
  );
  console.log(`Deposits: ${JSON.stringify(await bombay.gov.deposits(5320))}`);
  console.log(`Votes: ${JSON.stringify(await bombay.gov.votes(5320))}`);
}

main().catch(console.error);
