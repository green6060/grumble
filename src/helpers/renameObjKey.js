export default (
  oldProp,
  newProp,
  { [oldProp]: old, ...others }
) => ({
  [newProp]: old,
  ...others
})
