# from flask import request, url_for
import sys
# import pytest
sys.path.append('C:\Program Files\JetBrains\PyCharm Community Edition 2022.2\DjangoProject\RuralSense\Rural-Senses-Technical\\backend')
from app import app
# import tempfile
# import os
# import app
#
#
# # @pytest.fixture
# # def app():
# #     app = app()
# #     return app
#
#
# #
# # @pytest.fixture()
# # def client(app):
# #     return app.test_client()
# #
#
#
# @pytest.fixture
# def client():
#     db_fd, app.app.config['DATABASE'] = tempfile.mkstemp()
#     app.app.config['TESTING'] = True
#
#     with app.app.test_client() as client:
#         with app.app.app_context():
#             app.init_db()
#         yield client
#
#     os.close(db_fd)
#     os.unlink(app.app.config['DATABASE'])
# def test_user_authentication(client):
#     res = app.test_client().post('/api/user-signin',
#     data = {
#         "username": "admin",
#         "password": "admin123"
#     }
#     )
#     assert res.status_code == 200
#
#
#
#
# # def test_admin_dashboard(client):
# #     assert client.get(url_for('/api/admin-dashboard')).status_code == 200

import os
# import flaskr
# import unittest
# import tempfile
#
# class FlaskrTestCase(unittest.TestCase):
#
#     def setUp(self):
#         self.db_fd, app.config['DATABASE'] = tempfile.mkstemp()
#         app.config['TESTING'] = True
#         self.app = app.test_client()
#         with app.app_context():
#             init_db()
#
#     def tearDown(self):
#         os.close(self.db_fd)
#         os.unlink(app.config['DATABASE'])
#
#     def test_user_authentication(self):
#         res = app.test_client().post('/api/user-signin',
#         data = {
#             "username": "admin",
#             "password": "admin123"
#         }
#         )
#         assert res.status_code == 200
#
# if __name__ == '__main__':
#     unittest.main()