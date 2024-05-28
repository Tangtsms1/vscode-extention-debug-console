import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  function addConsoleWithValue(text: string) {
	const editor = vscode.window.activeTextEditor;
    if (!editor) {
      return;
    }
	let insertText = `console.log("%c debug-console: @text","color:#fff;background:#C02537;padding:5px",@text);`;

      if (text) {
        insertText = `${insertText.replace(/@text/g, text)}`;
      }

	  vscode.commands.executeCommand("editor.action.insertLineAfter").then(() => {
		  const position = new vscode.Position(editor.selection.start.line, 0);

		// 编辑当前文件
		editor.edit((editBuilder) => {
			editBuilder.insert(position, insertText);
		});
	  });
  }

  function addConsole(text: string) {
    // 获取当前打开的文件的editor
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      return;
    }
    const textArray: string[] = [];
    const Ranges = editor.selections;
	let insertText = `console.log("%c debug-console: @text","color:#fff;background:#14319C;padding:5px");`;

      if (text) {
        insertText = `${insertText.replace(/@text/g, text)}`;
      }

	  vscode.commands.executeCommand("editor.action.insertLineAfter").then(() => {
		  const position = new vscode.Position(editor.selection.start.line, 0);

		// 编辑当前文件
		editor.edit((editBuilder) => {
			editBuilder.insert(position, insertText);
		});
	  });
  }

  let disposable1 = vscode.commands.registerCommand(
    "vscode-extension-debug-console.debugConsole",
    async () => {
	  const clipboardText = await vscode.env.clipboard.readText();
      addConsole(clipboardText);
    }
  );

  context.subscriptions.push(disposable1);

  let disposable2 = vscode.commands.registerCommand(
    "vscode-extension-debug-console.addConsoleWithValue",
    async () => {
      const clipboardText = await vscode.env.clipboard.readText();
      addConsoleWithValue(clipboardText);
    }
  );

  context.subscriptions.push(disposable2);
}

export function deactivate() {}
