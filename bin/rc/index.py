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
auditpath = "/tmp/bersi-audit.csv"
logpath = "/tmp/bersi.log"
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
    head = "Timestamp,User,Command"
    f = open(auditpath, 'w')
    f.write(f'{head}\n')
    f.close()
else:
    log.info(f"Found log at: {auditpath}")
# endregion

# region VERSION
version = "RELEASE CANDIDATE Ver.1.0 (20220227)"
print(f"***Starting BERSI-{version}")
log.info(f"***Starting BERSI-{version}")
# endregion

# region PERMISSIONS
guild_ids = [850386581135163489]
log.info(f"Enabling for Server(s):{guild_ids}")

optin = [853806791150665748,873259572985495552]

# endregion

# region VARIABLES
x = datetime.datetime.now()
today = x.strftime("%Y%m%d")

db = "/var/www/html/MLBB-BuildShare/db/"
exports = "/var/www/html/MLBB-BuildShare/http/export/"
# endregion

#region MAIN FUNCTION

#endregion

# region DISCORD STUFF
# discord basic error handling:
@bot.event
async def on_command_error(ctx, error):
    if isinstance(error, commands.CommandNotFound):
        log.error(f"Command Not Found")
    if isinstance(error, commands.MissingRequiredArgument):
        log.error(f"Function Missing Argument")
    if isinstance(error, commands.Forbidden):
        log.error(f"Missing Access")
    if isinstance(error, commands.MissingPermissions):
        log.error(f"Insufficient Permissions")
    if isinstance(error, commands.BotMissingPermissions):
        log.error(f"Insufficient Bot Permissions")
    else:
        log.error(f"Unspecified Error")
# endregion

# region INIT
@bot.event
async def on_ready():
    log.info('We have logged in as {0.user}'.format(bot))

    startupembed = discord.Embed(
       title=f"***Started BERSI-{version}",
       description=f"Everything is looking ok...\n")

    startupembed.set_thumbnail(
        url="https://icons.iconarchive.com/icons/custom-icon-design/flatastic-9/256/Accept-icon.png")

    for channel_id in optin:
        await bot.get_channel(channel_id).send(embed=startupembed)

# endregion

bot.run(TOKEN)

