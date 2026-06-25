// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  const insertBoldCommand = vscode.commands.registerCommand(
    'markdown-palette.toggleBold',
    () => {
      const editor = vscode.window.activeTextEditor;

      if (editor) {
        let nextText = '';
        const selection = editor.selection;
        const text = editor.document.getText(selection);

        const isSelectionEmpty = text === '';

        if (!isSelectionEmpty) {
          const isBold = text.startsWith('**') && text.endsWith('**');

          if (isBold) {
            nextText = text.slice(2, -2);
          } else {
            nextText = `**${text}**`;
          }
        } else {
          nextText = `**太字**`;
        }

        editor
          .edit((editBuilder) => {
            editBuilder.replace(selection, nextText);
          })
          .then(() => {
            const startPos = selection.start;

            let newStart: vscode.Position;
            let newEnd: vscode.Position;

            if (isSelectionEmpty) {
              // 新しく「**太字**」を挿入したとき
              // 開始位置を ** の分だけ右にずらす（+2）
              newStart = startPos.translate(0, 2);
              // 終了位置を 中の文字（太字）の長さ分だけ右にずらす（+2 + 2 = 4）
              newEnd = newStart.translate(0, 2);
            } else {
              // 元々文字を選択していたとき（これまで通りの全体選択）
              newStart = startPos;
              newEnd = startPos.translate(0, nextText.length);
            }

            // 新しい選択範囲を適用
            editor.selection = new vscode.Selection(newStart, newEnd);
          });
      }
    },
  );

  const insertItalicCommand = vscode.commands.registerCommand(
    'markdown-palette.toggleItalic',
    () => {
      const editor = vscode.window.activeTextEditor;

      if (editor) {
        let nextText = '';
        const selection = editor.selection;
        const text = editor.document.getText(selection);

        const isSelectionEmpty = text === '';

        if (!isSelectionEmpty) {
          const isBold = text.startsWith('*') && text.endsWith('*');

          if (isBold) {
            nextText = text.slice(1, -1);
          } else {
            nextText = `*${text}*`;
          }
        } else {
          nextText = `*斜体*`;
        }

        editor
          .edit((editBuilder) => {
            editBuilder.replace(selection, nextText);
          })
          .then(() => {
            const startPos = selection.start;

            let newStart: vscode.Position;
            let newEnd: vscode.Position;

            if (isSelectionEmpty) {
              // 新しく「*斜体*」を挿入したとき
              // 開始位置を * の分だけ右にずらす（+1）
              newStart = startPos.translate(0, 1);
              // 終了位置を 中の文字（斜体）の長さ分だけ右にずらす（+1 + 2 = 3）
              newEnd = newStart.translate(0, 2);
            } else {
              // 元々文字を選択していたとき（これまで通りの全体選択）
              newStart = startPos;
              newEnd = startPos.translate(0, nextText.length);
            }

            // 新しい選択範囲を適用
            editor.selection = new vscode.Selection(newStart, newEnd);
          });
      }
    },
  );

  context.subscriptions.push(insertBoldCommand, insertItalicCommand);
}

// This method is called when your extension is deactivated
export function deactivate() {}
