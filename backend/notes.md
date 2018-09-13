[Wireframes](https://balsamiq.cloud/snv27r3/pr1kaax/r7BD7)

**all ables will have created_at and some will have updated_at**

1. user - django takes care of the user and we will only inherit from the table
**So, we make the assumption that the currently logged in/auhenticated  user is the pilot**

TODO: discus the user story again, without thinking how to program it, go through all the scenarios and then when you choose the one you like, write that one dow.

tables we have made ***all tables need created_at
1. aircraft - (NONE OF THESE FIELDS WILL CHANGE SO WE *MIGHT* NOT NEED UPDATED AT)
    id
    name
    man_type
    tail_number
    created_at 
    aircraft_sel
    foreign key userID

2. flights
    id
    name
    created_at
    foreign key userID
    pic
    day
    night


missing tables
3. instructors inheret from user
4. billing
5. settings
(6. airports) can pull from API

relationships
instructor can take a flight
1 instuctor: many flights
1flight: only 1 instructor
a user can have many flights
a instructor can fly many planes
a plane doesn't fly itself

billing
1st month free (trial)
monthly billing
premium features - TO-DO

settings - TODO

no instrument application (bool)
No ldg = number of landings (bool)
cross country (bool)
Grnd Trainer = (hours)
PIC (hours)
Dual rec (hours)
actual instruction (hours)
sim inst (hours)
day/night (bool)

instuctors = profile page(stretch/don't worry about it)

