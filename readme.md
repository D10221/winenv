# winenv

Sets env vars and paths to run an arbitrary command on steam wine/proton app prefixes

## Ex:

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

 ### ...

 https://wiki.winehq.org/List_of_Commands

## Dependencies

- steamtinkerlaunch
- winetricks ? 
- protontricks ? 
- steam
- GE-Proton
