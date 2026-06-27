export function validate(schema) {
  return (req, res, next) => {
    const result = schema.safeParse(req.body)

    if (!result.success) {
      return res.status(400).json({
        message: result.error.issues[0]?.message || '請求資料格式錯誤',
      })
    }

    req.body = result.data
    return next()
  }
}
