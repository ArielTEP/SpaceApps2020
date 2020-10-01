
# Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

# API

## Mapa
`GET /api/map`: Para pedir el estado actual del mapa y pintarlo. Este endpoint se mandaría a llamar cada segundo desde el UI con un timer.

```
{
	'map' : {
		'size' : [3, 4], // 3 x 4
		// el "grid" tendrá máximo 3x4 entradas y sólo contendrá las 
		// posiciones ya desbloqueadas
		"grid" : [
			{
				'x' : 1,
				'y' : 2,
				// "image" será el link a la imagen que se pondrá en la pieza
				// del grid ya desbloqueada
				'image': '/map/tile_1x2.jpeg',
				// "agents" contendrá el id de los agentes en esta posición
				'agents': ['id1', 'id3'],
				// "metadata" contendrá la información ya sensada/desbloqueada
				// por los robots que ya pasaron por ahí
				'metadata' : {
					// el "last_updated" de la hora a la que se actualizó el metadata
					'last_updated' : 'sept 24 2020',
					'temperature': 25,
					'magnetic_field': 4,
				}
			},
		]
	},
	'agents' : [
		{
			'id' : 'id del agente',
			'name': 'agente 1',
			'type' : 'physicist',
			'sensors' : [
				{
					'type' : 'magnetometer'
				},
			]
		},
	]
}
```

## Log
`GET /api/log?last_timestamp=45155415415`: Para pedir las últimos entradas del log. Este endpoint se mandaría a llamar cada segundo desde el UI con un timer.

**Args:**
- last_timestamp: funcionará como un offset para hacer paginación 

```
{
	'results' : [
		{'timestamp' : '', 'message' : ''}
	]
}
```

## Activity Map
`GET /api/activity`: Para pedir el mapa de cómo se están distribuyendo las actividades. Este endpoint se mandaría a llamar cada segundo desde el UI con un timer.

```
{
	'activities' : [
		{
			'name' : 'leer temperatura',
			'agents' : []
		},
		{
			'name' : 'leer presión',
			'agents' : [ 'id1', 'id4']
		},
	]
}
```
