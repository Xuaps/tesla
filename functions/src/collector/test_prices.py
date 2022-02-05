import datetime
from zoneinfo import ZoneInfo
from collector import prices


async def test_download_prices():
    today = datetime.datetime.today()
    date = datetime.datetime(year=today.year, month=today.month,
                             day=today.day, hour=0, second=0, tzinfo=ZoneInfo(key='UTC'))
    data = await prices.get_prices_at(date)

    print(data)
    print(date)
    assert data.get(date, 0) > 0
