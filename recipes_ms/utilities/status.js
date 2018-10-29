module.exports = {
  ok: { status: 200, message: 'OK' },
  created: { status: 201, message: 'Created' },
  unauthorized: { status: 401, message: 'UNAUTHORIZED' },
  not_found: { status: 404, message: 'NOT FOUND' },
  unprocessable_entity: { status: 422, message: 'UNPROCESSABLE ENTITY'},
  internal_error: { status: 500, message: 'INTERNAL ERROR' }
}
