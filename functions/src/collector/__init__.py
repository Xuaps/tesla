import datetime
import json
import azure.functions as func
from . import prices


async def main(timer: func.TimerRequest, file: func.Out[bytes]) -> None:
    date = datetime.datetime.now()
    data = await prices.getPricesAt(date)

    file.set(json.dumps({k.isoformat(): v for k, v in data.items()}))
