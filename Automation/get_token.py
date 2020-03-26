url = input('Input Login URL here: ')
ur = url.split('&')

id = ur[0].split('#')[1]
id = id.split('=')[1]

access = ur[1].split('=')[1]

print('id_token:')
print(id)
print('access_token:')
print(access)
