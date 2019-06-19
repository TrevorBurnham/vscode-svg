import { Range, Position, TextEditor, TextEditorEdit } from 'vscode';
import svgo = require('svgo');

export function svgPretty(textEditor: TextEditor, edit: TextEditorEdit) {
    let optimizer = new svgo({
        plugins:[{
            cleanupIDs: false
        }],
        js2svg: {
            pretty: true,
            indent: <number>textEditor.options.tabSize
        }
    });
    let document = textEditor.document;

    //return new Promise((resolve, reject) => {
        optimizer.optimize(document.getText()).then((result) => {
            let range = new Range(new Position(0, 0), document.lineAt(document.lineCount - 1).range.end)
            textEditor.edit(e=>{
                e.replace(range, result.data);
            });
            //resolve();
        });
    //});
}
