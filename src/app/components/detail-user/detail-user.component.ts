import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-detail-user',
  templateUrl: './detail-user.component.html',
  styleUrls: ['./detail-user.component.css']
})
export class DetailUserComponent implements OnChanges, OnInit{

  idUser?: number;
  user: User = {};

  userReactive: FormGroup = this.fb.group({
    id: this.fb.control(''),
    nome: this.fb.control('', [Validators.required, Validators.minLength(4)]),
    cognome: this.fb.control('', [Validators.required, Validators.minLength(4)]),
    dataDiNascita: this.fb.control('', [Validators.required])
  });

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private fb: FormBuilder){}

  ngOnInit(): void {
    if(this.route.snapshot.paramMap.get('id') != null){
      let id = this.route.snapshot.paramMap.get('id');
      this.idUser = parseInt(id!);
      this.user = {...this.userService.findById(this.idUser)}!;
      this.userReactive.patchValue(this.user);
      if(this.router.url.includes('detail'))
        this.userReactive.disable(); // lo posso fare anche particolareggiato con la get del parametro
    }
  }

  ngOnChanges(changes: SimpleChanges): void{
    if(this.idUser)
      this.user = this.userService.findById(this.idUser)!;
  }

  save(){
    this.userService.save(this.userReactive.value);
    this.router.navigate(['list']);
  }

  back(){
    this.router.navigate(['list']);
  }

  disable(): boolean {
    if(this.router.url.includes('detail'))
      return false;
    else
      return true;
  }
}
