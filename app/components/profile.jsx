import ProfileField from './profilefield'

export default function Profile() {
    const fields = ["First name", "Last name", "Gender", "Date of birth"];
    return (
        <div className='w-full flex items-center flex-col pt-5'>
            {fields.map((field, ind) => <ProfileField key={ind} field={field} />)}
        </div>
    )
}