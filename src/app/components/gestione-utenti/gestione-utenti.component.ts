import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { OutputRoleDto } from 'src/app/models/role/output-role-dto.model';
import { UserOutputDto } from 'src/app/models/user/user-output-dto.model';
import { UserService } from 'src/app/shared/services/user-service.service';

@Component({
  selector: 'app-gestione-utenti',
  templateUrl: './gestione-utenti.component.html',
  styleUrls: ['./gestione-utenti.component.css']
})
export class GestioneUtentiComponent implements OnInit {

  public userList !: UserOutputDto[];

  constructor(private userService : UserService, private router: Router, private messageService : MessageService){

  }

  ngOnInit(): void {
    this.getAllUsers();
  }



  getAllUsers() : UserOutputDto[]{
    this.userService.getAll().subscribe({
      next : (ul : UserOutputDto[]) => this.userList = ul
    });
    return this.userList
  }

  ban(id : number){
    this.userService.ban(id).subscribe({
      next : () => this.getAllUsers(),
      error : (e : HttpErrorResponse) => this.showErrorMessage(e.error.message)
    });
  }

  unban(id : number){
    this.userService.unban(id).subscribe({
      next : () => this.getAllUsers(),
      error : (e : HttpErrorResponse) => this.showErrorMessage(e.error.message)
    });
  }

  deleteUser(id : number){
    this.userService.delete(id).subscribe({
      next : () => {
        this.showSuccessMessage("Utente eliminato correttamente.");
        this.getAllUsers();
      },
      error : (e : HttpErrorResponse) => this.showErrorMessage(e.error.message)
    });
  }

  promote(id : number){
    this.userService.promote(id).subscribe({
      next : () => {
        this.showSuccessMessage("Utente promosso ad Admin correttamente.");
        this.getAllUsers();
      },
      error : (e : HttpErrorResponse) => this.showErrorMessage(e.error.message)
    });
  }

  isStaffMember(roles : OutputRoleDto[]) : boolean{
    for(let role of roles){
      if(role.id === 2){
        return true;
      }
    }
    return false;
  }

  showErrorMessage(message : string){
    this.messageService.add({ severity: 'error', summary: 'Error', detail: message});
  }
  showSuccessMessage(message : string) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: message });
  }

}
