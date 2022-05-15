# winenv

Sets env vars and paths to help run an arbitrary command on steam wine/proton app prefixes

## status
Works with GE-Proton, it breaks with 'Proton' and multiple library folders

## Usage:
```
winenv: v0.0.8 https://github.com/D10221/winenv

'Sets env vars and paths to help run an arbitrary command on steam wine/proton app prefixes'

Usage: 
 winenv # with no args, shows this
 winenv '[APPID|APP_NAME]' # show env for APPID or APP_NAME
 winenv '[APPID|APP_NAME]' '[COMMAND]' # run COMMAND with <APPID or APP_NAME> env
 winenv run '[APPID|APP_NAME]' '[COMMAND]' # run COMMAND with <APPID or APP_NAME> env
 winenv env '[APPID|APP_NAME]'' # show env for APPID or APP_NAME
 winenv info # show info for all installed apps, returns json format
 winenv info '[APPID|APP_NAME]' # show info for [APPID|APP_NAME], returns json format
 winenv id '[APP_NAME]' # search for appid for given name match, returns json format
 winenv 'install' # install 'winenv' script into ~/.local/bin
 winenv 'uninstall' # remove 'winenv' script into ~/.local/bin
 winenv 'update' # update 'winenv' script
Config:
 $STEAM_COMPAT_CLIENT_INSTALL_PATH # defaults to '~/.local/share/Steam'
```

# Config
 ... somewhere, like .bashrc
```
export STEAM_COMPAT_CLIENT_INSTALL_PATH=STEAM_HOME
```
`STEAM_COMPAT_CLIENT_INSTALL_PATH` defaults to `~/.local/share/Steam`
 
## Dependencies

- bash
- jq
- steam
- GE-Proton
- nodejs
- [vdf2json](https://github.com/d10221/vdf2json)

## Examples

### Winecfg

```bash
winenv 123456 'wine winecfg'
```

### Wine Uninstaller

```bash
winenv 123456 'wine uninstaller'
```

### Remove prefix (forever)

```bash
winenv 123456 'rm $WINEPREFIX -rf'
```

### Run with Proton 

```bash
winenv 123456 'proton run program.exe'
``` 
... or 

```bash
winenv 123456 '$PROTON run program.exe'
```

### wine console/terminal
```bash
winenv 123456 'wine wineconsole cmd'
```

```bash
# from there 
start /unix /usr/bin/gedit
```
 ... or 

```bash
'wine cmd /c start /unix /usr/bin/gedit'
```

### Wine path

```bash
winenv 244210 'wine winepath c:\' 
# /$/.local/share/Steam/steamapps/compatdata/$APPID/pfx/dosdevices/c:/'
```

### Task manager

```bash
 winenv 244210 'wine taskmgr'
 ```

 ### Which proton

 ```bash
 ./winenv 244210 'which proton' # which proton I'm running
 ```

 ### Piping
 ```bash
 ./winenv id "Proton Experimental" |xargs ./winenv info |jq -r '.appmanifest'| xargs cat | vdf2json |jq
 ```

 ## Resources & credits
 https://www.winehq.org/  
 https://wiki.winehq.org/List_of_Commands  
 https://github.com/frostworx/steamtinkerlaunch  
 https://github.com/Matoking/protontricks  
 https://github.com/Winetricks/winetricks  
 https://developer.valvesoftware.com/wiki/KeyValues  
 https://pypi.org/project/vdf/  
 https://pypi.org/project/vdf3/  
 https://github.com/Corecii/steam-binary-vdf-ts/blob/master/src/BinaryVdf.ts  
 https://gitlab.steamos.cloud/steamrt/steam-runtime-tools/-/blob/master/docs/steam-compat-tool-interface.md  
