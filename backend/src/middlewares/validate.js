export function validate(schema, target = 'body') {
  return (req, res, next) => {
    const result = schema.safeParse(req[target])

    if (!result.success) {
      return res.status(400).json({
        message: result.error.issues[0]?.message || '請求資料格式錯誤',
      })
    }

    req[target] = result.data
    return next()
  }
}
