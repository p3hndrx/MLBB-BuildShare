# region IMPORTS
import datetime
import os
from os.path import exists
from dotenv import load_dotenv

import json

import discord
from discord.ext import commands
from discord_slash import SlashCommand, SlashContext
from discord_slash.utils.manage_commands import create_option, create_choice

import logging
# endregion

# region ENVIRONMENT
load_dotenv()
TOKEN = os.getenv("DISCORD_TOKEN")
# endregion

# region LOGGING
  #check for audit path
auditpath = "/tmp/teddy-audit-dev.csv"
logpath = "/tmp/teddy-dev.log"
header=0
if not os.path.exists(auditpath):
    header=1

def setup_logger(logger_name, log_file, level=logging.INFO):
    l = logging.getLogger(logger_name)
    formatter = logging.Formatter(fmt='%(asctime)s: %(message)s',datefmt='%Y-%m-%d %H:%M:%S')
    fileHandler = logging.FileHandler(log_file, mode='a')
    fileHandler.setFormatter(formatter)
    streamHandler = logging.StreamHandler()
    streamHandler.setFormatter(formatter)
    l.setLevel(level)
    l.addHandler(fileHandler)
    l.addHandler(streamHandler)

def setup_audit(logger_name, log_file, level=logging.INFO):
    l = logging.getLogger(logger_name)
    formatter = logging.Formatter(fmt='%(asctime)s,%(message)s',datefmt='%Y-%m-%d %H:%M:%S')
    fileHandler = logging.FileHandler(log_file, mode='a')
    fileHandler.setFormatter(formatter)
    l.setLevel(level)
    l.addHandler(fileHandler)

setup_logger('log', logpath)
setup_audit('audit', auditpath)
log = logging.getLogger('log')
audit = logging.getLogger('audit')

  #add CSV header if doesn't exist
if header ==1:
    log.info(f"Writing HEADER to audit log: {auditpath}")
    head = "Timestamp,User,Command,Elo,Period,Sort,Role,View,ChartView,About,Show,HeroName"
    f = open(auditpath, 'w')
    f.write(f'{head}\n')
    f.close()
else:
    log.info(f"Found log at: {auditpath}")
# endregion

# region VERSION
version = "DEVELOPMENT Ver.02.111 (20220208)"
print(f"***Starting Teddy-{version}")
log.info(f"***Starting Teddy-{version}")
# endregion

# region PERMISSIONS
guild_ids = [850386581135163489]
log.info(f"Enabling for Server(s):{guild_ids}")

optin = [853816389499748382]
optout = [870376521251037214,853806791150665748,868655404840804392]

summaryroles = ['MLBB Official','DEV','Discord Bot Developer','Lead Moderator']
# endregion
