from flask_restful import Api
from flask_cors import CORS
from flask import Flask

app = Flask(__name__)
api = Api(app)

app.config['CORS_HEADERS'] = 'Content-Type'
cors = CORS(app)

import Template.TemplateResources as Template
api.add_resource(Template.Hello, '/api/v1/')

if __name__ == '__main__':
    app.run()