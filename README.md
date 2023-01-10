# note for KiviBot

[![npm-version](https://img.shields.io/npm/v/kivibot-plugin-note?color=527dec&label=kivibot-plugin-note&style=flat-square)](https://npm.im/kivibot-plugin-note)
[![dm](https://shields.io/npm/dm/kivibot-plugin-note?style=flat-square)](https://npm.im/kivibot-plugin-note)

[`KiviBot`](https://beta.kivibot.com) 的 [备忘录]() 插件。

**安装**

```shell
/plugin add note
```

**启用**

```shell
/plugin on note
```

**使用**

```shell
/note add XXX   添加一条备忘录
/note rm <index>   删除第i项备忘录
/note ls   查看备忘录
```

**配置**

编辑 `框架目录/data/plugins/note/config.json` 文件。

```jsonc
{
  // 触发命令
  "cmd": "/note"
}
```

然后使用以下命令重载插件生效。

```shell
/plugin reload note
```
