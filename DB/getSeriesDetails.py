import requests
import json

# Get JWT token
headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1OTE0NzU1NDAsImlkIjoiU2hvdyBUcmFja2VyIiwib3JpZ19pYXQiOjE1OTA4NzA3NDAsInVzZXJpZCI6MjI1MTI5NSwidXNlcm5hbWUiOiJnbWF0b3MifQ.UXElA88kRlLSYKhbEf7GX09Uaqgc9_jihTIyFrMGi95QF3JuqiWa9G6mhVfiFTC7KLdvkG2rvN_4BrLyn5cm92NZtIwZZvqo6M8xbdq0KLbEzSKOf4UeP0vTybofyaTXhjE8vGaB2I5C3rgmE2K7ZWyQtYKc8E_mZ08rjH36hnxUS_1BQYsGj1e7sf2-IwSDJnllLgWO75DYb8vpX-nHayl6EKvycIK7ikCB6YC5NWUWaTxp4bPd7asYtUxmHnmg6AcLADoA4xczaX5HmlhvOGG3qJ6W0MLeS5EHghLpaS1dw5qqNJgCXiRK9r7fVbTZ203Y664VvsTR7L3ygNsRsg',
}

data = '{"apikey":"073ee8c81c87d9dc57b8a3bbfbb79f0e","username":"gmatos","userkey":"5E1B41F8541A26.93421988"}'

response = requests.post('https://api.thetvdb.com/login', headers=headers, data=data)

token = response.json()['token']

# Get episode data
seriesEpisodes = []

#  Load series details
with open('series.json', 'r') as seriesFile:
    series = json.load(seriesFile)

headers = {
    'Accept': 'application/json',
    'Authorization': f'Bearer {token}',
}
#  Foreach serie, get episodes
for s in series['data']:
    page = 1
    episodes = []
    while page>0:
        response = requests.get(f'https://api.thetvdb.com/series/{s["id"]}/episodes?page={page}', headers=headers)
        if (response.status_code!=200):
            page = -1 
            continue
        for epi in response.json()['data']:
            episodes.append(epi)
        page += 1
    seriesEpisodes.append({"id": s['id'], "episodes": episodes})

returnValue = {"data": seriesEpisodes}
print(json.dumps(seriesEpisodes))