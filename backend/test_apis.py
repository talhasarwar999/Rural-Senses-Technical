# import os
# import tempfile
# import pytest
# from app import app
#
# @pytest.fixture
# def client():
#     db_fd, app.config['DATABASE'] = tempfile.mkstemp()
#     app.config['TESTING'] = True
#
#     with app.test_client() as client:
#         with app.app_context():
#             app.init_db()
#         yield client
#
#     os.close(db_fd)
#     os.unlink(app.config['DATABASE'])
#
# def login(client, username, password):
#     return client.post('/user-signin', data=dict(
#         username=username,
#         password=password
#     ), follow_redirects=True)