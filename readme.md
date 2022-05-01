# winenv

Sets env vars and paths to help run an arbitrary command on steam wine/proton app prefixes

# usage  
Show usage
```
winenv # with no arguments
```

Run ```$command``` with ```$APPID``` env
```
winenv <APPID> '<shell-command>'
```
Show env for ```$APPID```
```
winenv <APPID>' # show env for <APPID>" 
```
 
TODO:
```bash
winenv install   # TODO: copy it self to "$HOME/.local/bin/"
winenv uninstall # TODO: remove it self from "$HOME/.local/bin/"
winenv update    # TODO: replace it self with new version"
```

# Config
Defaults to 
```
# steam
STEAM_HOME=HOME/.local/share/Steam
STEAM_APPS=$STEAM_HOME/steamapps
STEAM_APPS_COMMON=$STEAM_APPS/common
# steam compat
STEAM_COMPAT_CLIENT_INSTALL_PATH=STEAM_HOME
STEAM_COMPATTOOLS=$STEAM_HOME/compatibilitytools.d
```
Reads from:  
```$PWD\.winenv```  
```$HOME\.config\winenv\.winenv```  
In That order


 ### ...

 https://wiki.winehq.org/List_of_Commands

## Dependencies

- bash
- steamtinkerlaunch
- steam
- GE-Proton

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