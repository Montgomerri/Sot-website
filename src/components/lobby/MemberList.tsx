export default function MemberList(){

const members=[
"Dennis",
"Ama",
"Kwame",
"Sarah"
];


return(

<aside
className="
w-64
bg-white
border-l
border-slate-200
p-5
"
>

<h3 className="font-bold mb-5">
Members
</h3>


<div className="space-y-3">

{
members.map(member=>(
<div
key={member}
className="
flex
items-center
gap-3
text-sm
"
>

<div
className="
h-8
w-8
rounded-full
bg-blue-100
text-blue-600
flex
items-center
justify-center
font-bold
"
>
{member[0]}
</div>


{member}

</div>
))
}

</div>


</aside>


)

}