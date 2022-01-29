import datetime
import json
from collector import prices

async def test_download_prices():
    base = datetime.datetime.today()
    date_list = [base - datetime.timedelta(days=x) for x in range(100)]

    for date in date_list:
        data = await prices.getPricesAt(date)
        with open(date.strftime("%Y-%m-%d") + ".json", 'w') as fp:
            json.dump({k.isoformat(): v for k, v in data.items()}, fp)
