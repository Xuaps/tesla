import aiohttp
from datetime import datetime
from aiopvpc import PVPCData

async def getPricesAt(date: datetime):
    async with aiohttp.ClientSession() as session:
        pvpc_handler = PVPCData(session=session, tariff="2.0TD")
        prices: dict = await pvpc_handler.async_update_prices(date)

        return prices
