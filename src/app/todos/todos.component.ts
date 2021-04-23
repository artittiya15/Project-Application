import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css'],
})
export class TodosComponent implements OnInit {
  incrementId: number = 0;
  todos: Todo[] = [];
  editTodo: Todo = {
    id: 0,
    title: '',
    description: '',
    checked: false,
  };

  addTodo: TodoForm = {
    id: 0,
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    checked: false,
  };

  constructor(public dialog: MatDialog) {
    this.incrementId = +(localStorage.getItem('incrementId') || '0');
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(TodoEditDialog, {
      width: '250px',
      data: Object.assign({}, this.editTodo),
    });

    dialogRef.afterClosed().subscribe((result: Todo) => {
      console.log('The dialog was closed');
      if (result === null || result === undefined) return;
      this.todos.map((todo: Todo) => {
        if (todo.id === result.id) {
          todo.title = result.title;
          todo.description = result.description;
        }
      });
      localStorage.setItem('todos', JSON.stringify(this.todos));
    });
  }

  getErrorMessage(name: string) {
    if (name === 'title' && this.addTodo.title.hasError('required')) {
      return 'You must enter a title';
    }
    if (
      name === 'description' &&
      this.addTodo.description.hasError('required')
    ) {
      return 'You must enter a description';
    }
    return this.addTodo.title.hasError('title') ? 'Invalid title' : '';
  }

  onCheck(): void {
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  onAdd(): void {
    let hasError = false;
    if (this.addTodo.title.hasError('required')) {
      this.addTodo.title.markAsTouched();
      hasError = true;
    }
    if (this.addTodo.description.hasError('required')) {
      this.addTodo.description.markAllAsTouched();
      hasError = true;
    }
    if (hasError) return;
    this.addTodo.id = ++this.incrementId;
    localStorage.setItem('incrementId', this.incrementId.toString());
    this.todos.push(
      Object.assign(
        {},
        {
          id: this.addTodo.id,
          title: this.addTodo.title.value,
          description: this.addTodo.description.value,
          checked: this.addTodo.checked,
        }
      )
    );
    this.addTodo.title.setValue('');
    this.addTodo.title.markAsUntouched();
    this.addTodo.description.setValue('');
    this.addTodo.description.markAsUntouched();

    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  onEdit(todo: Todo): void {
    this.editTodo = todo;
    this.openDialog();
  }

  onDelete(todo: Todo): void {
    this.todos.map((aTodo, index) => {
      if (todo.id === aTodo.id) this.todos.splice(index, 1);
    });
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  ngOnInit(): void {
    this.todos = JSON.parse(localStorage.getItem('todos') || '[]');
  }
}

@Component({
  selector: 'todos-edit-dialog',
  templateUrl: 'todos-edit-dialog.html',
})
export class TodoEditDialog {
  constructor(
    public dialogRef: MatDialogRef<TodoEditDialog>,
    @Inject(MAT_DIALOG_DATA) public todo: Todo
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}

export interface Todo {
  id: number;
  title: string;
  description: string;
  checked: boolean;
}

export interface TodoForm {
  id: number;
  title: FormControl;
  description: FormControl;
  checked: boolean;
}
