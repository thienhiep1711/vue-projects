export default (el) => {
  console.log(el)
  console.log('Test modules')

  const test = () => {
    let a = 1
    a++
  }
  console.log(test())
}
