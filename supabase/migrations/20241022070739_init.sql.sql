create policy "Enable delete for users based on user_id"
on "public"."todo"
as permissive
for delete
to authenticated
using (true);


create policy "Enable insert for authenticated users only"
on "public"."todo"
as permissive
for insert
to authenticated
with check (true);


create policy "Enable read access for all users"
on "public"."todo"
as permissive
for select
to public
using (true);


create policy "Enable update for users based on email"
on "public"."todo"
as permissive
for update
to authenticated
using (true)
with check (true);



