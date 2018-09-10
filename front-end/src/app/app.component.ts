import { Component, ViewChild, AfterViewInit } from '@angular/core';
import 'brace/theme/github';
import 'brace/mode/sql';
declare let ace: any;
// import { ace } from 'ng2-ace-editor'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  content = '<strong>Hi</strong>';
  contentAutoUpdate = 'SELECT * FROM autoUpdate;';
  myCode = 'SELECT * FROM tabs;';
  @ViewChild('highlight') highlight;
  @ViewChild('editorInfinity') editorInfinity;
  @ViewChild('firstEditor') firstEditor;

  onRuleChange(e) {
    console.log(e);
  }

  ngAfterViewInit() {
    const Range = ace.require('ace/range')['Range'];

    this.highlight
      .getEditor()
      .session.addMarker(new Range(0, 0, 2, 1), 'myMarker', 'fullLine');

    this.firstEditor.getEditor().session.setOption({
      'useWorker': true,
      enableBasicAutocompletion: true});
  }
}