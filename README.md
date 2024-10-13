# Calendar

This is a modified version of the [Calendar](https://github.com/liamcain/obsidian-calendar-plugin) plugin that highlights reviewed days.

![screenshot-full](https://raw.githubusercontent.com/flowing-abyss/obsidian-calendar-plugin/master/images/screenshot-full.png)

## Customization

In the daily note, you need to add the property `reviewed` and set it to `true` or `false`.

```yaml
---
reviewed: true
---
```

For customization, you can use the following CSS snippet.

```css
#calendar-container [data-reviewed~="false"] {
  background: rgba(255, 0, 0, 0.05);
}

#calendar-container [data-reviewed~="true"] {
  background: rgba(0, 255, 0, 0.05);
}
```
