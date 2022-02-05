from datetime import datetime
import aiohttp
from aiopvpc import PVPCData


async def get_prices_at(date: datetime):
    async with aiohttp.ClientSession() as session:
        pvpc_handler = PVPCData(session=session, tariff="2.0TD")
        prices: dict = await pvpc_handler.async_update_prices(date)

        return prices
