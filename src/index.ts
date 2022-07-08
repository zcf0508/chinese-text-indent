import { TextEncoder } from 'util'
import { commands, window, workspace } from 'vscode'
import type { ExtensionContext } from 'vscode'

export function activate(context: ExtensionContext) {
  window.showInformationMessage('「中文首行缩进」启动成功')
  // 注册 设置缩进 的命令
  const setIndentation = commands.registerCommand('cti.setIndentation', () => {
    const editor = window.activeTextEditor
    if (editor) {
      const document = editor.document
      const fileUri = document.uri

      const documentText = document.getText()
      const lines = documentText.split('\n')

      const res = lines.map((line) => {
        if (/^\x20{4}/.test(line) || line.length === 0)
          return line
        return `    ${line}`
      })

      workspace.fs.writeFile(fileUri, new TextEncoder().encode(res.join('\n')))
    }
  })
  context.subscriptions.push(setIndentation)
}

export function deactivate() {

}
