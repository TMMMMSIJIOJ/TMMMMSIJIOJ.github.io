<?php

class AdcashAntiAdblock_zqkexiic
{
    const ADCASH_ZONE_ID = 'zqkexiic';
    const ADCASH_ZONE_TYPE = 'atag';
    const ADCASH_SERVER_DOMAIN = 'linkonclick.com';
    const ADCASH_FALLBACK_DOMAIN = 'acacdn.com';

    /**
     * @IMPORTANT: Do not modify anything below this line
     */
    const CACHE_FILENAME = 'adblock_{TARGET}.cache';
    const TIMEOUT_MS = 200;
    const CONNECT_TIMEOUT_MS = 1000;
    const ADBLOCK_UA_VERSION = 'Adcash Anti-AdBlock client v1.1';
    const CACHE_TTL = 600;
    private $response = '';
    private $hasResponse = false;

    /**
     * @return string
     */
    public function run()
    {
        $prevErrorState = error_reporting(0);
        $this->fallback();

        $this->getFromCache();
        if (!$this->hasResponse) {
            $this->request();
            $this->setCache();
        }
        error_reporting($prevErrorState);
        return $this->response;
    }

    /**
     * Call our gateway for a fresh new adblock script
     */
    private function request()
    {
        $serviceDomain = self::ADCASH_SERVER_DOMAIN;
        $query = http_build_query(array(
            'zone_id' => self::ADCASH_ZONE_ID,
            'zone_type' => self::ADCASH_ZONE_TYPE,
        ));
        $targetUrl = "http://{$serviceDomain}/ad/s2sadblock.php?{$query}";

        $ch = curl_init($targetUrl);
        curl_setopt_array($ch, array(
            CURLOPT_RETURNTRANSFER => 1,
            CURLOPT_CONNECTTIMEOUT_MS => self::CONNECT_TIMEOUT_MS,
            CURLOPT_TIMEOUT_MS => self::TIMEOUT_MS,
            CURLOPT_USERAGENT => self::ADBLOCK_UA_VERSION,
            CURLOPT_FOLLOWLOCATION => false,
            CURLOPT_SSL_VERIFYPEER => true,
        ));
        $response = curl_exec($ch);
        $statusCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

        curl_close($ch);
        if (strlen($response) && $statusCode == '200') {
            $this->response = $response;
            $this->hasResponse = true;
        }
    }

    private function fallback()
    {
        $patterns = array(
            'atag' => '<script type="text/javascript" src="//{DOMAIN_TARGET}/script/atg.js" czid="{ZONE_TARGET}" data-adel="atag"></script>',
            'suv4' => '<script type="text/javascript" src="//{DOMAIN_TARGET}/script/suv4.js" zid="{ZONE_TARGET}" data-adel="lwsu"></script>',
            'ippg' => '<script type="text/javascript" src="//{DOMAIN_TARGET}/script/ippg.js" zid="{ZONE_TARGET}" data-adel="ippg"></script>',
            'ippf' => '<script type="text/javascript" src="//{DOMAIN_TARGET}/script/ippf.js" zid="{ZONE_TARGET}" data-adel="inpage"></script>',
        );
        if (isset($patterns[self::ADCASH_ZONE_TYPE])) {
            $this->response = strtr($patterns[self::ADCASH_ZONE_TYPE], array(
                '{DOMAIN_TARGET}' => self::ADCASH_FALLBACK_DOMAIN,
                '{ZONE_TARGET}' => self::ADCASH_ZONE_ID,
            ));
        }
    }

    private function getFromCache()
    {
        $this->invalidateCache();
        $cacheFile = $this->getFullCachePath();
        $cacheContents = '';
        if (file_exists($cacheFile) && is_readable($cacheFile)) {
            $cacheContents = file_get_contents($cacheFile);
        }
        if (strlen($cacheContents)) {
            $this->hasResponse = true;
            $this->response = $cacheContents;
        }
    }

    private function setCache()
    {
        if (!$this->hasResponse) {
            return;
        }
        $cacheFile = $this->getFullCachePath();
        @touch($cacheFile);
        if (file_exists($cacheFile)) {
            file_put_contents($cacheFile, $this->response);
        }
    }

    private function invalidateCache()
    {
        $cacheFile = $this->getFullCachePath();
        if (!file_exists($cacheFile) || !is_readable($cacheFile)) {
            return;
        }
        $createdTime = (int) filemtime($cacheFile);
        if ($createdTime + self::CACHE_TTL < time()) {
            unlink($cacheFile);
        }
    }

    private function getFullCachePath()
    {
        $filename = strtr(self::CACHE_FILENAME, array('{TARGET}' => self::ADCASH_ZONE_ID));
        $tempPath = $this->getTemporaryDirectory();
        return $tempPath . DIRECTORY_SEPARATOR . $filename;
    }

    private function getTemporaryDirectory()
    {
        if (function_exists('sys_get_temp_dir')) {
            return sys_get_temp_dir();
        } elseif (!empty($_ENV['TMP'])) {
            $dir = $_ENV['TMP'];
        } elseif (!empty($_ENV['TMPDIR'])) {
            $dir = $_ENV['TMPDIR'];
        } elseif (!empty($_ENV['TEMP'])) {
            $dir = $_ENV['TEMP'];
        } else {
            $dir = __DIR__;
        }
        return realpath($dir);
    }
}

$adblock = new AdcashAntiAdblock_zqkexiic();
echo $adblock->run();