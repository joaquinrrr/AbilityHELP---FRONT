import { Routes } from '@angular/router';
import { PersonalitiesComponent } from './components/personalities/personalities.component';
import { Gender } from './models/genders';
import { GendersComponent } from './components/genders/genders.component';
import { UsersComponent } from './components/users/users.component';
import { RolesComponent } from './components/roles/roles.component';
import { InsertarpersonalidadComponent } from './components/personalities/insertarpersonalidad/insertarpersonalidad.component';
import { CreargenerosComponent } from './components/genders/creargeneros/creargeneros.component';
import { CrearusersComponent } from './components/users/crearusers/crearusers.component';
import { CrearrolesComponent } from './components/roles/crearroles/crearroles.component';
import { Roles } from './models/roles';
import { CarrerasComponent } from './components/carreras/carreras.component';
import { CrearcarrerasComponent } from './components/carreras/crearcarreras/crearcarreras.component';
import { IncidentesComponent } from './components/incidentes/incidentes.component';
import { CrearincidentesComponent } from './components/incidentes/crearincidentes/crearincidentes.component';
import { TipointeraccionComponent } from './components/tipointeraccion/tipointeraccion.component';
import { CreartipointeraccionComponent } from './components/tipointeraccion/creartipointeraccion/creartipointeraccion.component';
import { InteraccionComponent } from './components/interaccion/interaccion.component';
import { CrearinteraccionComponent } from './components/interaccion/crearinteraccion/crearinteraccion.component';
import { ChatsComponent } from './components/chats/chats.component';
import { CrearchatsComponent } from './components/chats/crearchats/crearchats.component';
import { HorariosComponent } from './components/horarios/horarios.component';
import { CrearhorariosComponent } from './components/horarios/crearhorarios/crearhorarios.component';
import { ReunionesComponent } from './components/reuniones/reuniones.component';
import { CrearreunionesComponent } from './components/reuniones/crearreuniones/crearreuniones.component';
import { AsignacionincidentesComponent } from './components/asignacionincidentes/asignacionincidentes.component';
import { CrearasignacionincComponent } from './components/asignacionincidentes/crearasignacioninc/crearasignacioninc.component';
import { HomeComponent } from './components/home/home.component';
import { segGuard } from './guard/seguridad.guard';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
    },
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path:'personalidades',component:PersonalitiesComponent,
        children:[
            { path:'insertar',component:InsertarpersonalidadComponent },
            { path:'ediciones-personalidad/:id', component:InsertarpersonalidadComponent },
        ],
        canActivate: [segGuard], 
    },
    {
        path:'generos',component:GendersComponent,
        children:[
            { path:'insertar',component:CreargenerosComponent },
            { path:'ediciones-gender/:id', component:CreargenerosComponent },
        ],
        canActivate: [segGuard], 
    },
    {
        path:'usuarios',component:UsersComponent,
        children:[
            { path:'insertar',component:CrearusersComponent },
            { path:'ediciones-users/:id', component:CrearusersComponent },
        ],
        canActivate: [segGuard], 
    },
    {
        path:'roles', component: RolesComponent,
        children:[
            { path:'insertar',component:CrearrolesComponent },
            { path:'ediciones-roles/:id', component:CrearrolesComponent },
        ],
        canActivate: [segGuard], 
    },
    {
        path:'carreras', component: CarrerasComponent,
        children:[
            { path:'insertar',component:CrearcarrerasComponent },
            { path:'ediciones-carreras/:id', component:CrearcarrerasComponent },
        ],
        canActivate: [segGuard], 
    },
    {
        path:'incidentes', component: IncidentesComponent,
        children:[
            { path:'insertar',component:CrearincidentesComponent },
            { path:'ediciones-incidentes/:id', component:CrearincidentesComponent },
        ],
        canActivate: [segGuard], 
    },
    {
        path:'tipo-interacciones', component: TipointeraccionComponent,
        children:[
            { path:'insertar',component:CreartipointeraccionComponent },
            { path:'ediciones-tipo-interacciones/:id', component:CreartipointeraccionComponent },
        ],
        canActivate: [segGuard], 
    },
    {
        path:'interacciones', component: InteraccionComponent,
        children:[
            { path:'insertar',component:CrearinteraccionComponent },
            { path:'ediciones-interacciones/:id', component:CrearinteraccionComponent },
        ],
        canActivate: [segGuard], 
    },
    {
        path:'chats', component: ChatsComponent,
        children:[
            { path:'insertar',component:CrearchatsComponent },
            { path:'ediciones-chats/:id', component:CrearchatsComponent },
        ],
        canActivate: [segGuard], 
    },
    {
        path:'horarios', component: HorariosComponent,
        children:[
            { path:'insertar',component:CrearhorariosComponent },
            { path:'ediciones-horarios/:id', component:CrearhorariosComponent },
        ],
        canActivate: [segGuard], 
    },
    {
        path:'reuniones', component: ReunionesComponent,
        children:[
            { path:'insertar',component:CrearreunionesComponent },
            { path:'ediciones-reuniones/:id', component:CrearreunionesComponent },
        ],
        canActivate: [segGuard], 
    },
    {
        path:'asignacion-incidentes', component: AsignacionincidentesComponent,
        children:[
            { path:'insertar',component:CrearasignacionincComponent },
            { path:'ediciones-asignacion-incidentes/:id', component:CrearasignacionincComponent },
        ],
        canActivate: [segGuard], // solo construcciones, se debe agregar a cada uno
    },
    {
        path: 'homes',
        component: HomeComponent,
        canActivate: [segGuard], // solo construcciones, se debe agregar a cada uno
    },
];
