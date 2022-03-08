import json
import pandas as pd
from pandas import json_normalize

apibase = "/var/www/html/MLBB-API/v1/"
herodb = "hero-meta-final.json"
itemdb = "item-meta-final.json"

herolist = apibase+herodb
with open(herolist) as j:
    data = json.load(j)

    df = json_normalize(data, ['data'])
    idlist = df.set_index('id').to_dict()['uid']

