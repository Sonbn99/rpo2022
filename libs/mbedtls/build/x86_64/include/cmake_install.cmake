# Install script for directory: /home/son/AndroidStudioProjects/rpo2022/libs/mbedtls/mbedtls/include

# Set the install prefix
if(NOT DEFINED CMAKE_INSTALL_PREFIX)
  set(CMAKE_INSTALL_PREFIX "/usr/local")
endif()
string(REGEX REPLACE "/$" "" CMAKE_INSTALL_PREFIX "${CMAKE_INSTALL_PREFIX}")

# Set the install configuration name.
if(NOT DEFINED CMAKE_INSTALL_CONFIG_NAME)
  if(BUILD_TYPE)
    string(REGEX REPLACE "^[^A-Za-z0-9_]+" ""
           CMAKE_INSTALL_CONFIG_NAME "${BUILD_TYPE}")
  else()
    set(CMAKE_INSTALL_CONFIG_NAME "")
  endif()
  message(STATUS "Install configuration: \"${CMAKE_INSTALL_CONFIG_NAME}\"")
endif()

# Set the component getting installed.
if(NOT CMAKE_INSTALL_COMPONENT)
  if(COMPONENT)
    message(STATUS "Install component: \"${COMPONENT}\"")
    set(CMAKE_INSTALL_COMPONENT "${COMPONENT}")
  else()
    set(CMAKE_INSTALL_COMPONENT)
  endif()
endif()

# Install shared libraries without execute permission?
if(NOT DEFINED CMAKE_INSTALL_SO_NO_EXE)
  set(CMAKE_INSTALL_SO_NO_EXE "1")
endif()

# Is this installation the result of a crosscompile?
if(NOT DEFINED CMAKE_CROSSCOMPILING)
  set(CMAKE_CROSSCOMPILING "TRUE")
endif()

# Set default install directory permissions.
if(NOT DEFINED CMAKE_OBJDUMP)
  set(CMAKE_OBJDUMP "/home/son/Android/Sdk/ndk/21.4.7075529/toolchains/llvm/prebuilt/linux-x86_64/bin/x86_64-linux-android-objdump")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xUnspecifiedx" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/include/mbedtls" TYPE FILE PERMISSIONS OWNER_READ OWNER_WRITE GROUP_READ WORLD_READ FILES
    "/home/son/AndroidStudioProjects/rpo2022/libs/mbedtls/mbedtls/include/mbedtls/aes.h"
    "/home/son/AndroidStudioProjects/rpo2022/libs/mbedtls/mbedtls/include/mbedtls/aria.h"
    "/home/son/AndroidStudioProjects/rpo2022/libs/mbedtls/mbedtls/include/mbedtls/asn1.h"
    "/home/son/AndroidStudioProjects/rpo2022/libs/mbedtls/mbedtls/include/mbedtls/asn1write.h"
    "/home/son/AndroidStudioProjects/rpo2022/libs/mbedtls/mbedtls/include/mbedtls/base64.h"
    "/home/son/AndroidStudioProjects/rpo2022/libs/mbedtls/mbedtls/include/mbedtls/bignum.h"
    "/home/son/AndroidStudioProjects/rpo2022/libs/mbedtls/mbedtls/include/mbedtls/build_info.h"
    "/home/son/AndroidStudioProjects/rpo2022/libs/mbedtls/mbedtls/include/mbedtls/camellia.h"
    "/home/son/AndroidStudioProjects/rpo2022/libs/mbedtls/mbedtls/include/mbedtls/ccm.h"
    "/home/son/AndroidStudioProjects/rpo2022/libs/mbedtls/mbedtls/include/mbedtls/chacha20.h"
    "/home/son/AndroidStudioProjects/rpo2022/libs/mbedtls/mbedtls/include/mbedtls/chachapoly.h"
    "/home/son/AndroidStudioProjects/rpo2022/libs/mbedtls/mbedtls/include/mbedtls/check_config.h"
    "/home/son/AndroidStudioProjects/rpo2022/libs/mbedtls/mbedtls/include/mbedtls/cipher.h"
    "/home/son/AndroidStudioProjects/rpo2022/libs/mbedtls/mbedtls/include/mbedtls/cmac.h"
    "/home/son/AndroidStudioProjects/rpo2022/libs/mbedtls/mbedtls/include/mbedtls/compat-2.x.h"
    "/home/son/AndroidStudioProjects/rpo2022/libs/mbedtls/mbedtls/include/mbedtls/config_psa.h"
    "/home/son/AndroidStudioProjects/rpo2022/libs/mbedtls/mbedtls/include/mbedtls/constant_time.h"
    "/home/son/AndroidStudioProjects/rpo2022/libs/mbedtls/mbedtls/include/mbedtls/ctr_drbg.h"
    "/home/son/AndroidStudioProjects/rpo2022/libs/mbedtls/mbedtls/include/mbedtls/debug.h"
    "/home/son/AndroidStudioProjects/rpo2022/libs/mbedtls/mbedtls/include/mbedtls/des.h"
    "/home/son/AndroidStudioProjects/rpo2022/libs/mbedtls/mbedtls/include/mbedtls/dhm.h"
    "/home/son/AndroidStudioProjects/rpo2022/libs/mbedtls/mbedtls/include/mbedtls/ecdh.h"
    "/home/son/AndroidStudioProjects/rpo2022/libs/mbedtls/mbedtls/include/mbedtls/ecdsa.h"
    "/home/son/AndroidStudioProjects/rpo2022/libs/mbedtls/mbedtls/include/mbedtls/ecjpake.h"
    "/home/son/AndroidStudioProjects/rpo2022/libs/mbedtls/mbedtls/include/mbedtls/ecp.h"
    "/home/son/AndroidStudioProjects/rpo2022/libs/mbedtls/mbedtls/include/mbedtls/entropy.h"
    "/home/son/AndroidStudioProjects/rpo2022/libs/mbedtls/mbedtls/include/mbedtls/error.h"
    "/home/son/AndroidStudioProjects/rpo2022/libs/mbedtls/mbedtls/include/mbedtls/gcm.h"
    "/home/son/AndroidStudioProjects/rpo2022/libs/mbedtls/mbedtls/include/mbedtls/hkdf.h"
    "/home/son/AndroidStudioProjects/rpo2022/libs/mbedtls/mbedtls/include/mbedtls/hmac_drbg.h"
    "/home/son/AndroidStudioProjects/rpo2022/libs/mbedtls/mbedtls/include/mbedtls/mbedtls_config.h"
    "/home/son/AndroidStudioProjects/rpo2022/libs/mbedtls/mbedtls/include/mbedtls/md.h"
    "/home/son/AndroidStudioProjects/rpo2022/libs/mbedtls/mbedtls/include/mbedtls/md5.h"
    "/home/son/AndroidStudioProjects/rpo2022/libs/mbedtls/mbedtls/include/mbedtls/memory_buffer_alloc.h"
    "/home/son/AndroidStudioProjects/rpo2022/libs/mbedtls/mbedtls/include/mbedtls/net_sockets.h"
    "/home/son/AndroidStudioProjects/rpo2022/libs/mbedtls/mbedtls/include/mbedtls/nist_kw.h"
    "/home/son/AndroidStudioProjects/rpo2022/libs/mbedtls/mbedtls/include/mbedtls/oid.h"
    "/home/son/AndroidStudioProjects/rpo2022/libs/mbedtls/mbedtls/include/mbedtls/pem.h"
    "/home/son/AndroidStudioProjects/rpo2022/libs/mbedtls/mbedtls/include/mbedtls/pk.h"
    "/home/son/AndroidStudioProjects/rpo2022/libs/mbedtls/mbedtls/include/mbedtls/pkcs12.h"
    "/home/son/AndroidStudioProjects/rpo2022/libs/mbedtls/mbedtls/include/mbedtls/pkcs5.h"
    "/home/son/AndroidStudioProjects/rpo2022/libs/mbedtls/mbedtls/include/mbedtls/platform.h"
    "/home/son/AndroidStudioProjects/rpo2022/libs/mbedtls/mbedtls/include/mbedtls/platform_time.h"
    "/home/son/AndroidStudioProjects/rpo2022/libs/mbedtls/mbedtls/include/mbedtls/platform_util.h"
    "/home/son/AndroidStudioProjects/rpo2022/libs/mbedtls/mbedtls/include/mbedtls/poly1305.h"
    "/home/son/AndroidStudioProjects/rpo2022/libs/mbedtls/mbedtls/include/mbedtls/private_access.h"
    "/home/son/AndroidStudioProjects/rpo2022/libs/mbedtls/mbedtls/include/mbedtls/psa_util.h"
    "/home/son/AndroidStudioProjects/rpo2022/libs/mbedtls/mbedtls/include/mbedtls/ripemd160.h"
    "/home/son/AndroidStudioProjects/rpo2022/libs/mbedtls/mbedtls/include/mbedtls/rsa.h"
    "/home/son/AndroidStudioProjects/rpo2022/libs/mbedtls/mbedtls/include/mbedtls/sha1.h"
    "/home/son/AndroidStudioProjects/rpo2022/libs/mbedtls/mbedtls/include/mbedtls/sha256.h"
    "/home/son/AndroidStudioProjects/rpo2022/libs/mbedtls/mbedtls/include/mbedtls/sha512.h"
    "/home/son/AndroidStudioProjects/rpo2022/libs/mbedtls/mbedtls/include/mbedtls/ssl.h"
    "/home/son/AndroidStudioProjects/rpo2022/libs/mbedtls/mbedtls/include/mbedtls/ssl_cache.h"
    "/home/son/AndroidStudioProjects/rpo2022/libs/mbedtls/mbedtls/include/mbedtls/ssl_ciphersuites.h"
    "/home/son/AndroidStudioProjects/rpo2022/libs/mbedtls/mbedtls/include/mbedtls/ssl_cookie.h"
    "/home/son/AndroidStudioProjects/rpo2022/libs/mbedtls/mbedtls/include/mbedtls/ssl_ticket.h"
    "/home/son/AndroidStudioProjects/rpo2022/libs/mbedtls/mbedtls/include/mbedtls/threading.h"
    "/home/son/AndroidStudioProjects/rpo2022/libs/mbedtls/mbedtls/include/mbedtls/timing.h"
    "/home/son/AndroidStudioProjects/rpo2022/libs/mbedtls/mbedtls/include/mbedtls/version.h"
    "/home/son/AndroidStudioProjects/rpo2022/libs/mbedtls/mbedtls/include/mbedtls/x509.h"
    "/home/son/AndroidStudioProjects/rpo2022/libs/mbedtls/mbedtls/include/mbedtls/x509_crl.h"
    "/home/son/AndroidStudioProjects/rpo2022/libs/mbedtls/mbedtls/include/mbedtls/x509_crt.h"
    "/home/son/AndroidStudioProjects/rpo2022/libs/mbedtls/mbedtls/include/mbedtls/x509_csr.h"
    )
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xUnspecifiedx" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/include/psa" TYPE FILE PERMISSIONS OWNER_READ OWNER_WRITE GROUP_READ WORLD_READ FILES
    "/home/son/AndroidStudioProjects/rpo2022/libs/mbedtls/mbedtls/include/psa/crypto.h"
    "/home/son/AndroidStudioProjects/rpo2022/libs/mbedtls/mbedtls/include/psa/crypto_builtin_composites.h"
    "/home/son/AndroidStudioProjects/rpo2022/libs/mbedtls/mbedtls/include/psa/crypto_builtin_primitives.h"
    "/home/son/AndroidStudioProjects/rpo2022/libs/mbedtls/mbedtls/include/psa/crypto_compat.h"
    "/home/son/AndroidStudioProjects/rpo2022/libs/mbedtls/mbedtls/include/psa/crypto_config.h"
    "/home/son/AndroidStudioProjects/rpo2022/libs/mbedtls/mbedtls/include/psa/crypto_driver_common.h"
    "/home/son/AndroidStudioProjects/rpo2022/libs/mbedtls/mbedtls/include/psa/crypto_driver_contexts_composites.h"
    "/home/son/AndroidStudioProjects/rpo2022/libs/mbedtls/mbedtls/include/psa/crypto_driver_contexts_primitives.h"
    "/home/son/AndroidStudioProjects/rpo2022/libs/mbedtls/mbedtls/include/psa/crypto_extra.h"
    "/home/son/AndroidStudioProjects/rpo2022/libs/mbedtls/mbedtls/include/psa/crypto_platform.h"
    "/home/son/AndroidStudioProjects/rpo2022/libs/mbedtls/mbedtls/include/psa/crypto_se_driver.h"
    "/home/son/AndroidStudioProjects/rpo2022/libs/mbedtls/mbedtls/include/psa/crypto_sizes.h"
    "/home/son/AndroidStudioProjects/rpo2022/libs/mbedtls/mbedtls/include/psa/crypto_struct.h"
    "/home/son/AndroidStudioProjects/rpo2022/libs/mbedtls/mbedtls/include/psa/crypto_types.h"
    "/home/son/AndroidStudioProjects/rpo2022/libs/mbedtls/mbedtls/include/psa/crypto_values.h"
    )
endif()

