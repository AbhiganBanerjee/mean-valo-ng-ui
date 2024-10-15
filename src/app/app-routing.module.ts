import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgentsComponent } from './components/agents/agents.component';
import { HomeComponent } from './components/home/home.component';
import { MapsComponent } from './components/maps/maps.component';
import { ArsenalComponent } from './components/arsenal/arsenal.component';
import { AgentguardGuard } from './guards/agentguard.guard';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { MapguardGuard } from './guards/mapguard.guard';
import { ArsenalguardGuard } from './guards/arsenalguard.guard';

const routes: Routes = [
  //Configure routes & their Guards here
  {path:"agents", component:AgentsComponent, canActivate:[AgentguardGuard]},
  {path:"home", component:HomeComponent},
  {path:"maps", component:MapsComponent, canActivate:[MapguardGuard]},
  {path:"arsenal",component:ArsenalComponent, canActivate:[ArsenalguardGuard]},
  {path:"login",component:LoginComponent},
  {path:"register",component:RegisterComponent},

  //Wild card path redirect to Home
  {path:"", redirectTo:"home", pathMatch:"full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
