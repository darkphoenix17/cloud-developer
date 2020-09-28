
import { CustomAuthorizerEvent, CustomAuthorizerResult } from 'aws-lambda'
import 'source-map-support/register'

import { verify } from 'jsonwebtoken'
import { JwtToken } from '../../auth/JwtToken'

const cert = `-----BEGIN CERTIFICATE-----
MIIDDTCCAfWgAwIBAgIJDdad1m8Xl5v4MA0GCSqGSIb3DQEBCwUAMCQxIjAgBgNV
BAMTGWRldi1oNXdjMjZlcC51cy5hdXRoMC5jb20wHhcNMjAwOTIxMjA0NTI5WhcN
MzQwNTMxMjA0NTI5WjAkMSIwIAYDVQQDExlkZXYtaDV3YzI2ZXAudXMuYXV0aDAu
Y29tMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAruNUu0p3UVJhWD/A
iR6okweYmt85WHzAj9ntEXTzzv2nn+mYDP/nOEu/5AqMLn5ctbfpvoC/V+O0YlDb
Y0nOg+ntW5XYhM25FBJItTvbPxXNOBl0kHTQQCSy9SHxvaZKrregLqgrtfkbneVB
lJN+9Gx4i6syaIK9PbejOG4zwxI/hwlOsjNKVwiftGMc7EzyKPnl4S0Cqib6vtCd
XcZJRlhmCDazn920tgDoRnUZHjO0pORp9G0ZlkwlT0DkE+XQWv5uLNBzZ1dh1aJU
KHzw+0Xdbp0CSwm+Z3xfhrfK8zYkO2BjKE40cqvreHEgUWcDOUAAKpwEeLusdkav
xQ9D4QIDAQABo0IwQDAPBgNVHRMBAf8EBTADAQH/MB0GA1UdDgQWBBTOYlJeILi7
ZR7bYzI6i9iJF4+G3TAOBgNVHQ8BAf8EBAMCAoQwDQYJKoZIhvcNAQELBQADggEB
AGH8BmoXMPqcUxJ4R6edimHQDTSRcny3aczm/Nv6Mxgmw6KuJRtl0GytPRABvvva
z7t4n0zI4sDF1bObAK5S5z1DYwWJES5scAG/gtrpB9wB2pdPplHorzdPzD6OeQX/
m1OrroE6sb/1eZwYUWX50F/IuhXR/OiS4l2r7xj15cSJ+dWM9HUEVTFY/U8I0UsK
mCtYNoUr8OGkrxoDnQMSsgG5YLDNXDo3iLdUdUikzo7930S1ufJiKeVV3k9wjoBG
f6T4FLTQjycWfrSu/TsjmTxxYPGdZ/XUiWDLWZ3r/tJy2rFmoPMDMOZXD5KGy9Gi
XvmbfzkTbS3S70+oPY3YjVk=
-----END CERTIFICATE-----`

export const handler = async (event: CustomAuthorizerEvent): Promise<CustomAuthorizerResult> => {
  try {
    const jwtToken = verifyToken(event.authorizationToken)
    console.log('User was authorized', jwtToken)

    return {
      principalId: jwtToken.sub,
      policyDocument: {
        Version: '2012-10-17',
        Statement: [
          {
            Action: 'execute-api:Invoke',
            Effect: 'Allow',
            Resource: '*'
          }
        ]
      }
    }
  } catch (e) {
    console.log('User authorized', e.message)

    return {
      principalId: 'user',
      policyDocument: {
        Version: '2012-10-17',
        Statement: [
          {
            Action: 'execute-api:Invoke',
            Effect: 'Deny',
            Resource: '*'
          }
        ]
      }
    }
  }
}

function verifyToken(authHeader: string): JwtToken {
  if (!authHeader)
    throw new Error('No authentication header')

  if (!authHeader.toLowerCase().startsWith('bearer '))
    throw new Error('Invalid authentication header')

  const split = authHeader.split(' ')
  const token = split[1]

  return verify(token, cert, { algorithms: ['RS256'] }) as JwtToken
}
