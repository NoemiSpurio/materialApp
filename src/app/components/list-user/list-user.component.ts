import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit{

  constructor(private userService: UserService, private router: Router, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getData();
  }

  utenti?: User[];
  dataSource!: MatTableDataSource<User>;
  displayedColumns: string[] = ['id', 'nome', 'cognome', 'dataDiNascita', 'azioni'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit(){
    this.dataSource.paginator = this.paginator;
  }

  openDialog(idUser: number): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: 'auto',
      data: idUser
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getData();
      this.dataSource.paginator = this.paginator;
    })
  }

  // dataSource = this.userService.getUsers();
  // dataSource = this.userService.getUsersOf(); // qui in teoria dovrei fare la subscribe

  getData(){
  this.userService.getUsersOf().subscribe(res => {
    this.dataSource = new MatTableDataSource<User>(res);
  });
  }

  show(idUser: number){
    this.router.navigate(["detail", idUser]);
  }

  delete(idUser: number){
    this.userService.delete(idUser);
    this.getData();
    this.dataSource.paginator = this.paginator;
  }

  edit(idUser: number){
    this.router.navigate(["edit", idUser]);
  }

  create(){
    this.router.navigate(["create"]);
  }
}
