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

import perms
# endregion

# region ENVIRONMENT
load_dotenv()
TOKEN = os.getenv("DISCORD_TOKEN")
# endregion

# region LOGGING
  #check for audit path
auditpath = "/tmp/bersi-audit-dev.csv"
logpath = "/tmp/bersi-dev.log"
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
version = "DEVELOPMENT Ver.1.12 (20220325)"
print(f"***Starting BERSI-{version}")
log.info(f"***Starting BERSI-{version}")
# endregion

# region VARIABLES
x = datetime.datetime.now()
today = x.strftime("%Y%m%d")

db = "/var/www/html/MLBB-BuildShare/db/"
bin = "/var/www/html/MLBB-BuildShare/bin/dev/"
exports = "/var/www/html/MLBB-BuildShare/http/export/"


bot = commands.Bot(command_prefix="/buildd ", intents=discord.Intents.all())
slash = SlashCommand(bot, sync_commands=True)

# endregion

#region MAIN FUNCTION

@slash.slash(name="buildshared",
             description="Use this command to fetch and share your builds!",
             guild_ids=perms.guild_ids,
             options=[
                 create_option(
                     name="code",
                     description="Enter the build-code you'd like to find!",
                     option_type=3,
                     required=True
                 ),
                create_option(
                     name="about",
                     description="About BERSI",
                     option_type=3,
                     required=False,
                     choices=[
                         create_choice(
                             name="Show",
                             value="show"),
                         create_choice(
                             name="Code",
                             value="code"),
                         create_choice(
                             name="Do",
                             value="do")
                     ]
                 )
               ]
             )

async def _overall(ctx, code="0",do="null",about="null"):
    channelid = ctx.channel.id
    await ctx.send(f":robot: `Processing request...`")

    if code == "0":
        about = "show"
    elif code == "1":
        about = "code"
    elif code == "2":
        about = "do"
    elif len(code) != 32:
        about = "helper"

    if channelid in perms.optout:
        await ctx.channel.send(content="`Sorry, I'm not allowed to do that here. \nPlease try a different channel.`")
        channelname = ctx.channel.name
        log.info(f"Permission Denied for Channel: {channelname}({channelid})")
    else:
        # audit
        user = ctx.author
        audit.info(f"{user},{code},{do}")
        log.info(f"{user} used /buildshare")


        # HELP VIEW
        if about != "null":
            if about == "show":
                about_title = "About: BERSI"
                desc = "Bersi (aka 'BS or 'BuildShare') is a MLBB Build Sharing Bot made exclusively for the MLBB NA Discord Server.\n\n"
            elif about == "code":
                about_title = "About: Build Codes"
                desc = "Build Codes are unique 32-digit codes generated by the companion webapp: https://mlbb.site/builder"
            elif about == "do":
                about_title = "What can BERSI 'do'?"
                desc = "Command Options List:\
                           \n\n`/buildshare` - Show a build \
                           \n `code:(your code here)` - required, options: (`0`,`1`,`2`) \
                           \n `about:(Show, Code, Do)` - Show the commands "
            elif about == "helper":
                about_title = "Invalid Code"
                desc = "Build Share codes will be *32-characters* long. \
                       \n\n Try some of the following codes to view the help pages:  \
                       \n `/buildshare Code: 0` - Same as `About:Show` \
                       \n `/buildshare Code: 1` - Same as `About:Code` \
                       \n `/buildshare Code: 2` - Same as `About:Do` \
                       \n\nOr visit: https://mlbb.site/builder to create a new code, and try again!"

            # Declare Embed
            helpembed = discord.Embed(
                    title=f"{about_title}",
                    description=f"{desc}\n"
                )
            helpembed.set_thumbnail(
                url="https://icons.iconarchive.com/icons/custom-icon-design/flatastic-2/256/help-desk-icon.png")
            helpembed.set_author(name="p3", url="https://github.com/p3hndrx",
                                 icon_url="https://cdn.discordapp.com/avatars/336978363669282818/74ce51e0a6b2990a5c4153a8a7a36f37.png")

            if about == "show":
                helpembed.add_field(name=f"Version:",
                                    value=f"{version}\n\n")
                helpembed.add_field(name=f"How to Use: (it's easy)",
                                    value=f"Step1: Visti MLBB-BuildShare (https://mlbb.site/builder) \
                                          \n Step2: Pick a hero, add some equipment \
                                          \n Step3: Copy the code \
                                          \n Step4: Use with BERSI",
                                    inline=False
                                    )
            if about == "code":
                helpembed.add_field(name=f"What does this all mean?",
                                    value=f"The code uniquely identifies your build among the many builds created with this app.\
                                          \n After you create your build online, BERSI retrieves it for you and posts it here!",
                                    inline=False
                                    )


            await ctx.channel.send(embed=helpembed)

        else:
        # MAIN OUTPUT
            #check for export path:
            if os.path.isdir(exports):
                buildpath = f"{exports}{code}.png"
                if os.path.exists(buildpath):
                    #await ctx.channel.send(content="\n ```Searching....```")
                    log.info(f"Reading File: {buildpath}")

                    color = discord.Color.blurple()
                    ico = f"https://mlbb.site/MLBB-BuildShare/http/img/ico-dev.png"

                    #### DECLARE EMBED ####
                    embed = discord.Embed(
                        title=f"Your Build:",
                        description=f"Build Code: {code}\n",
                        color=color)

                    #### Generate Thumbnail ####
                    embed.set_thumbnail(url=ico)

                    filename = f"{code}.png"
                    file = discord.File(buildpath, filename=f"{filename}")
                    embed.set_image(url=f"attachment://{filename}")

                    embed.add_field(name=f"Created by MLBB BuildShare::",
                                    value=f"https://mlbb.site/builder\n",
                                    inline=False)
                    await ctx.channel.send(file=file, embed=embed)

                else:
                    log.warning(f"Bad Request: Missing: {buildpath}")
                    await ctx.channel.send(content="```I cannot find that build!...```\n Visit: https://mlbb.site/builder to get started!")
            else:
                log.warning(f"Bad Request: Missing: {exports}")
                await ctx.channel.send(content="```No Builds Found!...```")

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
    log.info(f"Enabling for Server(s):{perms.guild_ids}")

    startupembed = discord.Embed(
       title=f"***Started BERSI-{version}",
       description=f"Everything is looking ok...\n")

    startupembed.set_thumbnail(
        url="https://icons.iconarchive.com/icons/custom-icon-design/flatastic-9/256/Accept-icon.png")

    for channel_id in perms.optin:
        await bot.get_channel(channel_id).send(embed=startupembed)

# endregion

bot.run(TOKEN)

