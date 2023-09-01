export default function Alert({children}) {
    return (
        <div className="text-center my-2 bg-red-600 text-white font-bold p-3 uppercase">
            {children}
        </div>
    )
}