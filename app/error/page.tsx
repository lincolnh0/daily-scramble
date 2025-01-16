export default function Error() {
  return (
      <div className={"flex flex-col justify-center items-center max-w-2xl gap-12 font-mono min-h-52"}>
        <h1 className={"lg:text-3xl md:text-xl text-lg font-bold text-center"}>Uh oh, something went wrong.</h1>
        <div className={"flex flex-col gap-2"}>
          <p>
            This isn't supposed to happen, please try again later.
          </p>
        </div>
      </div>
  )
}