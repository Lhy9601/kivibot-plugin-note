# note for KiviBot

[![npm-version](https://img.shields.io/npm/v/kivibot-plugin-note?color=527dec&label=kivibot-plugin-note&style=flat-square)](https://npm.im/kivibot-plugin-note)
[![dm](https://shields.io/npm/dm/kivibot-plugin-note?style=flat-square)](https://npm.im/kivibot-plugin-note)

[`KiviBot`](https://beta.kivibot.com) 的 [备忘录]() 插件。

### 安装

```shell
/plugin add note
```

### 启用

```shell
/plugin on note
```

### 重载

```shell
/plugin reload note
```

### 权限

> 目前总共有 3 种权限：`admin`, `list`, `all`, 默认为 `admin`

`admin`: 只有主管理员能使用所有命令

`list`: 列表中的 QQ 号可以使用非管理员指令，存储于 config.json 文件下的 user 数组中

`all`: 所有 QQ 号都可以使用非管理员指令(有可能因使用人数多导致 json 文件数量多)

### 使用

**主管理员指令**：

```
/note mode   查看当前权限模式
/note mode <admin/list/all>   切换权限模式
/note addu <QQ号>   添加QQ号到权限列表中
/note rmu <QQ号>   从权限列表删除QQ号
/note user   查看list权限的列表
```

**非管理员指令**：

```
/note add <things>   添加一条备忘录
/note rm <i>   删除第 i 项备忘录
/note ls   查看备忘录
```

### 数据

数据存储于 `data/plugins/note` 下，与用户 QQ 号对应的 json 文件中

### 待办事项

- [ ] 添加新权限：QQ 群，群内人员可使用
- [ ] 批量删除备忘录
- [ ] 将备忘录分为未完成及已完成，通过“完成”指令将未完成备忘录添加到已完成列表
- [ ] 在添加备忘录基础上可增加时间，到时间 QQ 机器人会通过消息提醒

### 其他

有问题可通过`KiviBot Beta 交流群` 群内私聊 QQ 号 `981442990`
