from pbServer.pony_db import *


with db_session:
    User.select().show()
    # News(comission=comission, news_title='fresh', news_description='news')
    # News.select().show()
