from flask_restful import Api
from flask_cors import CORS
from flask import Flask

# create PROD (with static website) or DEV instance
import os
env = os.environ.get("ENV", "DEV")
if env == "PROD":
    app = Flask(__name__, static_folder='../frontend/build', static_url_path='/')
else:
    app = Flask(__name__)
api = Api(app)

app.config['CORS_HEADERS'] = 'Content-Type'
cors = CORS(app)

import Template.TemplateResources as Template
api.add_resource(Template.Hello, '/api/v1/')

# entry point to serve static files for the UI
@app.route('/', defaults={'path': ''})
@app.route("/<string:path>")
@app.route('/<path:path>')
def index(path):
    return app.send_static_file('index.html')

if __name__ == '__main__':
    app.run()